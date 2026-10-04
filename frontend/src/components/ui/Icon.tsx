import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faRoute,
  faCompass,
  faClock,
  faArrowLeft,
  faRotateRight,
  faLocationDot,
  faPaperPlane,
  faPenNib,
  faPlus,
  faSun,
  faMoon,
  faRightToBracket,
  faLocationCrosshairs,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  type FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

const icons = {
  route: faRoute,
  compass: faCompass,
  clock: faClock,
  arrowLeft: faArrowLeft,
  rotateRight: faRotateRight,
  locationDot: faLocationDot,
  paperPlane: faPaperPlane,
  penNib: faPenNib,
  plus: faPlus,
  sun: faSun,
  moon: faMoon,
  rightToBracket: faRightToBracket,
  locationCrosshairs: faLocationCrosshairs,
  // ...rest
} as const satisfies Record<string, IconDefinition>;

export type IconName = keyof typeof icons;

interface IconProps extends Omit<FontAwesomeIconProps, 'icon'> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  return <FontAwesomeIcon icon={icons[name]} {...props} />;
}
