export default function Footer() {
  return (
    <footer className="border-t border-gray-800 px-4 py-8 text-center text-gray-600 text-sm">
      <p>
        SoroLearn is open source and built for the Stellar community.{" "}
        <a
          href="https://github.com/sorolearn/sorolearn"
          className="underline hover:text-gray-400 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contribute on GitHub
        </a>
      </p>
    </footer>
  );
}
