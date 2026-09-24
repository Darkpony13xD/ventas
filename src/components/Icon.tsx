type IconName = 'arrow' | 'bag' | 'search' | 'close' | 'check' | 'play' | 'tv' | 'music' | 'chat' | 'spark' | 'plus' | 'minus';
const paths: Record<IconName, string> = {
  arrow: 'M5 12h14m-6-6 6 6-6 6', bag: 'M5 7h14l1 14H4L5 7Zm3 0V6a4 4 0 0 1 8 0v1',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0', close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6', play: 'm9 5 11 7-11 7V5Z', tv: 'M3 5h18v13H3V5Zm5 17h8M12 18v4',
  music: 'M9 18V5l12-3v13M9 7l12-3M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm12-3a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  chat: 'M21 11a9 9 0 0 1-9 9H3l2-4a9 9 0 1 1 16-5ZM8 10h8M8 14h5', spark: 'm12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z', plus: 'M12 5v14M5 12h14', minus: 'M5 12h14'
};
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
