import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
export class ManageTours {
  tours: Tour[] = [];
  tourForm: any;
  isEditing = false;
  editingId: number | null = null;
  isAdmin = false;

  constructor(
    private fb: FormBuilder,
    private travelService: TravelService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
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

  onSubmit() {
    if (!this.isAdmin) {
      alert('Access denied. Admins only.');
      this.router.navigate(['/home']);
      return;
    }

    if (this.tourForm.invalid) return;

    if (this.isEditing && this.editingId) {
      this.travelService.updateTour(this.editingId, this.tourForm.value);
      this.isEditing = false;
      this.editingId = null;
      alert('Tour updated successfully!');
    } else {
      this.travelService.addTour(this.tourForm.value);
      alert('New tour added!');
    }

    this.tours = this.travelService.getAllTours();
    this.tourForm.reset();
  }

  editTour(tour: Tour) {
    this.isEditing = true;
    this.editingId = tour.id;
    this.tourForm.patchValue(tour);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  deleteTour(id: number) {
    if (confirm('Are you sure you want to delete this tour?')) {
      this.travelService.deleteTour(id);
      this.tours = this.travelService.getAllTours();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.editingId = null;
    this.tourForm.reset();
  }
}
