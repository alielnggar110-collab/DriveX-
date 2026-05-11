import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  stats = [
    { number: '150+', label: 'Cars Available' },
    { number: '5,000+', label: 'Happy Clients' },
    { number: '8+', label: 'Years Experience' },
    { number: '24/7', label: 'Continuous Support' }
  ];
  values = [
    { icon: 'shield', title: 'Trusted Safety', desc: 'All our cars are fully inspected and insured to ensure your complete peace of mind during the rental period.' },
    { icon: 'tag', title: 'Transparent Pricing', desc: 'No hidden fees or extra charges. The displayed price is the final price with no surprises.' },
    { icon: 'clock', title: 'Fast Execution', desc: 'The booking process takes just minutes with door-to-door car delivery in the shortest possible time.' },
    { icon: 'headset', title: 'Ongoing Support', desc: 'Our customer service team is available around the clock to help with any inquiries or emergencies.' }
  ];
}