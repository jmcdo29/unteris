import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Deity } from '@unteris/shared/types';

type DomainType = Exclude<Deity['domain'], undefined>[number];

const filterDomains = (
  deity: Deity,
  domainType: DomainType['type']
): Omit<DomainType, 'type'>[] => {
  return (deity.domain ?? [])
    .filter((d) => d.type === domainType)
    .map((dom) => ({ id: dom.id, name: dom.name }));
};

const titles: Record<DomainType['type'], string> = {
  cleric: 'Cleric Domains',
  druid: 'Druidic Circles',
  warlock: 'Warlock Pacts',
};

const Domain = ({
  type,
  domains,
}: {
  type: DomainType['type'];
  domains: Omit<DomainType, 'type'>[];
}) => {
  const theme = useTheme();
  if (domains.length === 0) {
    return <></>;
  }
  return (
    <Box margin={theme.spacing(1, 0)}>
      <Typography variant="body2" fontSize="1.5em">
        {titles[type]}
      </Typography>
      {domains.map((d) => d.name).join(', ')}
    </Box>
  );
};

export const DeityDomains = ({ deity }: { deity: Deity }): JSX.Element => {
  const druidDomains = filterDomains(deity, 'druid');
  const warlockDomains = filterDomains(deity, 'warlock');
  const clericDomains = filterDomains(deity, 'cleric');
  if (!deity.domain?.length) {
    return <Box />;
  }
  return (
    <Box>
      <Domain type="cleric" domains={clericDomains} />
      <Domain type="druid" domains={druidDomains} />
      <Domain type="warlock" domains={warlockDomains} />
    </Box>
  );
};
