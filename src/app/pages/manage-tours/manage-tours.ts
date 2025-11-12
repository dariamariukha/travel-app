import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TravelService, Tour } from '../../services/travel.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-manage-tours',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-tours.html',
  styleUrl: './manage-tours.css'
})
export class ManageTours implements OnInit {
  isAdmin = false;
  tours: Tour[] = [];
  tourForm!: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private travelService: TravelService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.auth.isAdmin();
    if (!this.isAdmin) {
      this.router.navigate(['/home']);
      return;
    }

    this.tours = this.travelService.getAllTours();

    this.tourForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      country: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      details: ['', [Validators.required, Validators.minLength(10)]],
      price: [0, [Validators.required, Validators.min(50)]],
      duration: ['', Validators.required],
      image: ['', Validators.required]      
    });
  }

  onSubmit(): void {
    if (!this.isAdmin) {
      alert('Access denied. Admins only.');
      this.router.navigate(['/home']);
      return;
    }
    if (this.tourForm.invalid) return;

    if (this.isEditing && this.editingId !== null) {
      this.travelService.updateTour(this.editingId, this.tourForm.value as Tour);
      alert('Tour updated successfully!');
      this.isEditing = false;
      this.editingId = null;
    } else {
      this.travelService.addTour(this.tourForm.value as Omit<Tour, 'id'>);
      alert('New tour added!');
    }

    this.tours = this.travelService.getAllTours();
    this.tourForm.reset({
      title: '', country: '', description: '', details: '',
      price: 0, duration: '', image: ''
    });
  }

  editTour(tour: Tour): void {
    if (!this.isAdmin) return;
    this.isEditing = true;
    this.editingId = tour.id;
    this.tourForm.patchValue({
      title: tour.title,
      country: tour.country,
      description: tour.description,
      details: (tour as any).details ?? '',
      price: tour.price,
      duration: tour.duration,
      image: tour.image
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteTour(id: number): void {
    if (!this.isAdmin) return;
    if (confirm('Are you sure you want to delete this tour?')) {
      this.travelService.deleteTour(id);
      this.tours = this.travelService.getAllTours();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingId = null;
    this.tourForm.reset({
      title: '', country: '', description: '', details: '',
      price: 0, duration: '', image: ''
    });
  }
}
