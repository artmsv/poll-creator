// most common button
export function Button(props: React.ComponentProps<'button'>) {
  return (
    <button
      className="text-xs text-white font-semibold bg-primary py-2 min-w-24 px-2 rounded disabled:bg-tertiary active:bg-[#227A66]"
      {...props}
    />
  );
}
