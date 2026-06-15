export default function SocialButton({ provider, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-sm font-semibold text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50 hover:shadow-md active:scale-[0.98]"
    >
      <div className="absolute left-4">
        <Icon className="h-5 w-5" />
      </div>
      <span>Continue with {provider}</span>
    </button>
  );
}
