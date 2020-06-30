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
              age: '4-6 ans',
              startTime: '14:00',
              endTime: '14:50',
            },
            {
              age: '7-12 ans',
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
              startTime: '10:15',
              endTime: '11:00',
            },
            {
              age: '6-8 ans',
              startTime: '11:00',
              endTime: '-11:50',
            },
            {
              age: '>9 ans',
              startTime: '12:00',
              endTime: '13:00',
            },
          ],
        },
        // map: 'url  colombes map',
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
              age: '4-6 ans',
              startTime: '17:00',
              endTime: '18:00',
            },
            {
              age: '7-10 ans',
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
                startTime: '19:20',
                endTime: '20:20'
              },
              {
                day: 'Vendredi',
                startTime: '19:00',
                endTime: '20:30'
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
                startTime: '19:00',
                endTime: '20:30'
              }
            ],
          }
        ],
      }
    ];

  constructor(private router: Router) { }

  ngOnInit() { }

  public onNavigate(event: Event): void {
    this.router.navigateByUrl('/contact');
  }
}
