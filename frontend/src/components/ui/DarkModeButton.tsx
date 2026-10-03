import IconButton from '@mui/material/IconButton';
import { useColorScheme } from '@mui/material/styles';

import { Icon } from '@/components/ui/Icon';

const DarkModeButton = () => {
  const { mode, systemMode, setMode } = useColorScheme();
  if (!mode) return null; // undefined until MUI has read the saved preference

  const isDark = (mode === 'system' ? systemMode : mode) === 'dark';

  return (
    <IconButton
      onClick={() => setMode(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <Icon
        name={isDark ? 'moon' : 'sun'}
        className={isDark ? 'text-brand-400' : 'text-warning'}
      />
    </IconButton>
  );
};

export default DarkModeButton;
