// 4-point astroid star — Anthropic / Claude sparkle family. Two strokes only,
// reads as: a star.
type Props = { size?: number };

export default function SpikeMark({ size = 18 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 1 Q12 12 23 12 Q12 12 12 23 Q12 12 1 12 Q12 12 12 1 Z" />
    </svg>
  );
}
