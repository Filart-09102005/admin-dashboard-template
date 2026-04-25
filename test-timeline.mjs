import { createTimeline, stagger } from 'animejs';

const tl = createTimeline({
  defaults: {
    duration: 600
  }
});

tl.add('.sidebar', { opacity: [0, 1] })
  .add('.sidebar-item', { opacity: [0, 1], delay: stagger(100) }, '-=400');

console.log(typeof tl.add);
