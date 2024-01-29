import { Images, Links } from '@application/constants';
import Image from 'next/image';

type ImageMeta = {
  height: number;
  target?: string;
  alt?: string;
  rel?: string;
  isNavElement?: boolean;
};

type LogoProps = {
  logo?: string;
  url?: string;
  metadata: ImageMeta;
  classNames?: string;
};

export default function Logo(props: LogoProps) {
  const {
    logo = Images.logo.maqsad.noMargin,
    url = Links.internal.home,
    metadata,
    classNames,
  } = props;

  const {
    height,
    alt = 'logo',
    target = 'internal',
    rel = 'nofollow',
    isNavElement = false,
  } = metadata;

  const openInNewTab = target === 'external';

  const logoPlacement = () => {
    if (!isNavElement) {
      return (
        <a
          href={url}
          target={openInNewTab ? '_blank' : '_self'}
          rel={openInNewTab ? 'external noreferrer' : rel}
          className={`pointer${
            classNames !== undefined ? ` ${classNames}` : ''
          }`}
        >
          <Image
            src={logo}
            alt={alt}
            width={height * 3.43575}
            height={height}
          />
        </a>
      );
    }
    return (
      <div
        className={`pointer${classNames !== undefined ? ` ${classNames}` : ''}`}
      >
        <Image src={logo} alt={alt} width={height * 3.43575} height={height} />
      </div>
    );
  };

  return logoPlacement();
}
