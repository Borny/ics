import {
  animate,
  animateChild,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInTrigger = trigger('fadeIn', [
  transition(':enter', [
    query(
      ':self',
      [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate(900, style({ opacity: 1, transform: 'translateY(0)' })),
      ],
      {
        optional: true,
      }
    ),
  ]),
]);

export const buttonAnimation = trigger('buttonState', [
  state(
    'valid',
    style({
      backgroundColor: 'light',
      borderColor: 'green',
    })
  ),

  state(
    'invalid',
    style({
      backgroundColor: 'red',
      borderColor: 'red',
    })
  ),

  transition('invalid => valid', [
    group([
      animate(
        1000,
        style({
          transform: 'scale(1.1)',
        })
      ),
      animate(
        2000,
        style({
          background: 'green',
        })
      ),
    ]),
    // animate(
    //   200,
    //   style({
    //     transform: 'scale(1)',
    //   })
    // ),
  ]),
]);

export const descriptionListTrigger = trigger('descriptionState', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        stagger(300, [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          animate(
            500,
            style({
              opacity: 1,
              transform: 'translateY(0)',
            })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);
