import { Injectable } from '@angular/core';

export interface Tour {
  id: number;
  country: string;
  title: string;
  description: string;
  details: string,
  price: number;
  duration: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private tours: Tour[] = [
    {
      id: 1,
      country: 'France',
      title: 'Romantic Paris',
      description: 'Enjoy a 3-day trip to Paris with visits to the Eiffel Tower and Louvre Museum.',
      details: 'Includes guided museum tour, Seine river cruise, and a traditional French dinner.',
      price: 450,
      duration: '3 days',
      image: 'assets/paris.jpg'
    },
    {
      id: 2,
      country: 'Ukraine',
      title: 'Kyiv Cultural Weekend',
      description: 'Explore historical Kyiv and its cozy cafés.',
      details: 'Includes visit to Kyiv Pechersk Lavra, St. Sophia’s Cathedral, and Podil district.',
      price: 200,
      duration: '2 days',
      image: 'assets/kyiv.jpg'
    },
    {
      id: 3,
      country: 'Austria',
      title: 'Vienna Classic Tour',
      description: 'Discover the musical heart of Europe with a 4-day trip to Vienna.',
      details: 'Includes Schönbrunn Palace tour, classical concert, and coffee tasting.',
      price: 380,
      duration: '4 days',
      image: 'assets/vienna.jpg'
    },
    {
      id: 4,
      country: 'Italy',
      title: 'Venice & Florence Journey',
      description: 'Admire Italian art and canals in this 5-day adventure.',
      details: 'Includes gondola ride, Uffizi Gallery visit, and wine tasting in Tuscany.',
      price: 520,
      duration: '5 days',
      image: 'assets/venice.jpg'
    },
    {
      id: 5,
      country: 'France',
      title: 'Provence Lavender Escape',
      description: 'Breathe the scent of lavender fields and enjoy the calm of the French countryside.',
      details: 'Includes visit to local lavender farms, perfume workshop, and vineyard lunch.',
      price: 410,
      duration: '3 days',
      image: 'assets/france-lavender.jpg'
    },
    {
      id: 6,
      country: 'Poland',
      title: 'Warsaw Heritage Tour',
      description: 'Discover Poland’s resilient capital full of stories and architecture.',
      details: 'Includes Old Town walk, Royal Castle, and Chopin Museum.',
      price: 290,
      duration: '3 days',
      image: 'assets/warsaw.jpg'
    },
    {
      id: 7,
      country: 'Italy',
      title: 'Rome Eternal Experience',
      description: 'Walk through the ancient heart of the Roman Empire.',
      details: 'Includes Colosseum entry, Vatican Museums tour, and authentic Italian dinner.',
      price: 540,
      duration: '4 days',
      image: 'assets/rome.jpg'
    },
    {
      id: 8,
      country: 'Germany',
      title: 'Munich & Bavaria Adventure',
      description: 'Mountains, castles, and beer — explore southern Germany!',
      details: 'Includes Neuschwanstein Castle visit and Bavarian beer tasting.',
      price: 460,
      duration: '4 days',
      image: 'assets/munich.jpg'
    },
    {
      id: 9,
      country: 'Switzerland',
      title: 'Swiss Alps Discovery',
      description: 'Explore breathtaking mountains and lakes.',
      details: 'Includes Jungfrau excursion, Lucerne lake cruise, and chocolate factory visit.',
      price: 720,
      duration: '5 days',
      image: 'assets/switzerland.jpg'
    },
    {
      id: 10,
      country: 'Spain',
      title: 'Barcelona & Costa Brava Escape',
      description: 'Feel the rhythm of Spain with beaches and Gaudí architecture.',
      details: 'Includes Sagrada Família tour, flamenco night, and day trip to Girona.',
      price: 480,
      duration: '4 days',
      image: 'assets/barcelona.jpg'
    }
  ];

  private cart: Tour[] = [];

  getAllTours(): Tour[] {
    return [...this.tours];
  }

  filterTours(countries: string[], minPrice?: number, maxPrice?: number): Tour[] {
    return this.tours.filter(tour => {
      const matchCountry = countries.length ? countries.includes(tour.country) : true;
      const matchPrice =
        (!minPrice || tour.price >= minPrice) && (!maxPrice || tour.price <= maxPrice);
      return matchCountry && matchPrice;
    });
  }

  getById(id: number): Tour | undefined {
    return this.tours.find(t => t.id === id);
  }

  addToCart(tour: Tour) {
    if (!this.cart.some(t => t.id === tour.id)) {
      this.cart.push(tour);
    }
  }

  getCart(): Tour[] {
    return [...this.cart];
  }

  removeFromCart(id: number) {
    this.cart = this.cart.filter(t => t.id !== id);
  }

  clearCart() {
    this.cart = [];
  }

  addTour(tour: any) {
    tour.id = this.tours.length ? this.tours[this.tours.length - 1].id + 1 : 1;
    this.tours.push(tour);
  }

  updateTour(id: number, updatedTour: any) {
    const index = this.tours.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tours[index] = { ...this.tours[index], ...updatedTour };
    }
  }

  deleteTour(id: number) {
    this.tours = this.tours.filter(t => t.id !== id);
  }

}
