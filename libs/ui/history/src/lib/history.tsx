import { Typography } from '@mui/material';
import { Grid } from '@unteris/ui/components';
import { ReactNode } from 'react';

const HistoryBlurb = ({ children }: { children: ReactNode }): JSX.Element => (
  <Typography variant="body1" gutterBottom={true} paragraph={true}>
    {children}
  </Typography>
);

export const History = (): JSX.Element => {
  return (
    <>
      <HistoryBlurb>
        It started in pieces and suffering. A world shattered and floating out
        in the Empyrean Sea. On the remains was a never ending struggle between
        seven small continents. The people were nothing more than faceless,
        white beings that were trapped within the struggle, fighting creatures
        so bloodthirsty that the waters ran red. So much so that it spilled out
        into the Empyrean Sea and caused a shower of stars to rain down onto the
        land. Each continent got hit with a particularly large star. And each
        star burned away to leave behind a gem-like orb in its crater that fused
        with the first being it came into contact with. This created the Seven
        Champions who then used the gift of the stars to defend against the
        ravenous creatures that devoured them every day. The Champions each
        named their continent. Flos, Nox, Calor, Lectrum, Maré, Natura and
        Gelum. The faceless followed their Champion, fighting off anything that
        did not originate from their own continent. Because of this, the red
        waters did not recede. Eventually, the waters rose and started to
        corrode away at the land so fiercely that Maré started to sink and
        Lectrum shattered. Their Champions disappeared along with them.
      </HistoryBlurb>
      <HistoryBlurb>
        An earth trembling roar fell over the fighting, stunning all into
        silence and stillness. A Being from the Empyrean Sea descended from the
        clouds, graceful and majestic, and swam through the sky while using a
        small portion of their power to pull and bind the continents together.
        This Being then grabbed the new continent in the middle and pulled out a
        piece. The island created from the act was left high in the sky and a
        single oak seed was planted. To keep watch over the seed, the Being
        grabbed a handful of stardust and gently breathed life into it,
        spreading the dust around the sky island and creating the first
        Celestials.
      </HistoryBlurb>
      <HistoryBlurb>
        Awestruck by the Being, the Champions vowed to stop fighting and create
        a land worth living on, protecting their own. During the growth of the
        island tree, named the Vitoak, other Beings made their way from the
        Empyrean Sea. Using a mixture of stardust and their own powers, these
        Beings gave birth to their own versions of Celestials. These Celestials
        stayed on the land below and helped the Champions fertilize the earth,
        allowing more types of life to flourish. The Vitoak continued to grow
        during the years, to the point that the treetop was not visible from the
        surface. Hidden by clouds, the Celestials took to the treetop as their
        home, a way to continue watching over the surface. The Champions chose
        to stay and watch over the faceless. Who, over time, changed with the
        new land.
      </HistoryBlurb>
      <Grid sx={{ justifyItems: 'center' }}>
        <img src="unteris_map.jpg" alt="Unteris Map" width="80%" />
      </Grid>
    </>
  );
};
