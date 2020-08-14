import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionsKids } from '../../models/sessionsKids.model';
import { SessionsAdults } from '../../models/sessionsAdults.model';

@Component({
  selector: 'programs',
  templateUrl: 'programs.component.html',
  styleUrls: ['programs.component.scss']
})

export class ProgramView implements OnInit {

  public contactBtnText = 'Nous contacter';
  // public subscriptionBtnText = 'Inscription';
  public subscriptionBtnText = 'Nous contacter';

  public sessionsKids: SessionsKids[] =
    [
      {
        address: {
          city: 'Paris',
          venue: 'La Tour des Dames',
          street: '18 rue de la Tour des Dames',
          zipcode: 75009,
        },
        schedule: {
          day: 'Samedi',
          groups: [
            {
              age: '4-5 ans',
              startTime: '14:00',
              endTime: '14:50',
            },
            {
              age: '6-10 ans',
              startTime: '15:00',
              endTime: '16:00',
            },
          ],
        },
        // map: 'url paris',
      },
      {
        address: {
          city: 'Colombes',
          venue: 'Gymnase Henri Dunant',
          street: '147 rue Henri Dunant',
          zipcode: 92700,
        },
        schedule: {
          day: 'Samedi',
          groups: [
            {
              age: '4-5 ans',
              startTime: '10:10',
              endTime: '11:00',
            },
            {
              age: '6-10 ans',
              startTime: '11:00',
              endTime: '12:00',
            }
          ],
        },
        // map: 'url  colombes map',
      },
      {
        address: {
          city: 'Colombes',
          venue: 'Ecole Maintenon',
          street: '44, rue Saint Denis',
          zipcode: 92700,
        },
        schedule:
        {
          day: 'Adolescents',
          groups: [
            {
              age: 'Lundi',
              startTime: '18:45',
              endTime: '19:45',
            },
            {
              age: 'Mercredi',
              startTime: '19:30',
              endTime: '20:30'
            },
            {
              age: 'Vendredi',
              startTime: '19:30',
              endTime: '21:00'
            }
          ]
        }
      },
      {
        address: {
          city: 'Bois Colombes',
          venue: 'Dojo Jean Jaurès',
          street: 'Avenue du Vaudreuil',
          zipcode: 92270,
        },
        schedule: {
          day: 'Mercredi',
          groups: [
            {
              age: '4-5 ans',
              startTime: '17:10',
              endTime: '18:00',
            },
            {
              age: '6-10 ans',
              startTime: '18:00',
              endTime: '19:00',
            }
          ],
        },
        // map: 'url  colombes map',
      },
    ];

  public sessionsAdults: SessionsAdults[] =
    [
      {
        address: {
          city: 'Colombes',
          venue: 'Ecole Maintenon',
          street: '44, rue Saint Denis',
          zipcode: 92700,
        },
        schedule: [
          {
            category: 'Adolescents',
            time: [
              {
                day: 'Lundi',
                startTime: '18:45',
                endTime: '19:45'
              },
              {
                day: 'Mercredi',
                startTime: '19:30',
                endTime: '20:30'
              },
              {
                day: 'Vendredi',
                startTime: '19:30',
                endTime: '21:00'
              }
            ],
          },
          {
            category: 'Adultes',
            time: [
              {
                day: 'Lundi',
                startTime: '19:30',
                endTime: '20:45'
              },
              {
                day: 'Mercredi',
                startTime: '20:00',
                endTime: '21:00'
              },
              {
                day: 'Vendredi',
                startTime: '19:30',
                endTime: '21:00'
              }
            ],
          }
        ],
      }
    ];

  constructor(private router: Router) { }

  ngOnInit() { }

  public onNavigateContact(event: Event): void {
    this.router.navigateByUrl('/contact');
  }
  public onNavigateSubscription(event: Event): void {
    this.router.navigateByUrl('/contact');
    // this.router.navigateByUrl('/inscription');
  }
}
