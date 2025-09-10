"use client";

export default function HarViewerPage() {
  return (
    <div className="bg-white min-h-screen p-6 flex justify-center">
      {/* Container */}
      <div className="w-full max-w-5xl space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-black">
            HAR File Viewer
          </h1>
          <p className="text-black">
            Fast, free, open source, ad-free tools.
          </p>
          <p className="text-sm text-black">
            by <b>Jam.dev</b> — One click bug reports devs love
          </p>
        </header>

        {/* Upload Section */}
        <section className="bg-gray-900  rounded-2xl shadow p-6 space-y-4">
          <p className="text-white">
            No file chosen. Drop your .har or .json file here to analyze.
          </p>
          <input
            type="file"
            accept=".har,.json"
            className="block w-full text-black bg-white  p-3 rounded-lg border border-gray-300 dark:border-gray-700"
          />
        </section>

        {/* Intro */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-2">
          <p className="text-black">
            Use our free HAR file viewer to instantly upload and inspect your HAR (HTTP Archive) files online. Whether debugging network performance or analyzing web traffic, this tool helps you diagnose issues faster.
          </p>
          <p className="text-black">
            PS. Scroll down for even faster debugging.
          </p>
        </section>

        {/* How to View HAR Files */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">
            How to View HAR Files Online
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Upload your HAR files instantly and start analyzing them online.</li>
            <li>Navigate the entries: Review all network requests made during the session.</li>
            <li>Examine request details: Click any entry to see headers, payload, and response.</li>
            <li>Analyze timings: DNS lookup, connection, SSL handshake, response time.</li>
            <li>Identify issues: Spot failed or slow requests and inspect headers and payloads.</li>
            <li>Export data: Save for further analysis or sharing with your team.</li>
          </ul>
        </section>

        {/* How to Create a HAR File */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">
            How to Create a HAR File
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-black">
            <li>Navigate to the page where the issue occurs.</li>
            <li>Open Developer Tools (Chrome: View → Developer → Developer Tools or right-click → Inspect).</li>
            <li>Select the "Network" tab and check "Preserve log".</li>
            <li>Stop existing recording and clear logs to start fresh.</li>
            <li>Start a new recording and reproduce the issue.</li>
            <li>Click the "Export HAR" button to save the file.</li>
          </ol>
          <p className="text-black">
            Detailed steps for Edge, Safari, and Firefox are available on our site.
          </p>
        </section>

        {/* Jam Promo Section */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-4">
          <h2 className="text-2xl font-bold text-black">
            Meet Jam: Everything in a HAR File + More in 1 Click
          </h2>
          <p className="text-black">
            Chances are you’re stuck explaining all those steps above to actually get a HAR file (or trying to reproduce issues so you can get it yourself).
          </p>
          <p className="text-black">
            Skip the manual process of generating HAR files — let Jam do the work for you. With Jam’s browser extension, you get everything a HAR file offers plus automatic steps to reproduce, metadata, and AI-powered debugging assistance. In just one click, Jam captures your screen and all the data you need to resolve bugs quickly.
          </p>
          <p className="text-black">
            Try it within minutes and debug faster with the same shortcuts you use on Chrome dev tools.
          </p>
          <div className="mt-4 text-center">
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 transition">
              Get Jam for Free
            </button>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              150+ reviews · 100k+ users
            </p>
          </div>
        </section>

        {/* HAR Analyzer */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">
            How to Use the HAR Analyzer for Debugging
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Upload: Drag and drop your HAR file or click to upload.</li>
            <li>Navigate entries: Review all network requests.</li>
            <li>Examine request details: Headers, payload, response.</li>
            <li>Analyze timings: DNS, connection, SSL handshake, response time.</li>
            <li>Identify issues: Failed requests or long durations.</li>
            <li>Export data: Share or analyze further.</li>
          </ul>
        </section>

        {/* FAQs */}
        <section className="bg-white  rounded-2xl shadow p-6 space-y-2">
          <h2 className="text-2xl font-bold text-black">FAQs</h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li><b>What is a HAR file?</b> A HAR (HTTP Archive) file logs all web requests and responses during a session.</li>
            <li><b>What is a HAR file viewer?</b> It lets developers inspect and visualize data captured in HAR files.</li>
            <li><b>Can I analyze HAR files with this tool?</b> Yes, it works as both a viewer and analyzer.</li>
            <li><b>How to open a HAR file?</b> Upload to this viewer or open with a text editor / browser dev tools.</li>
            <li><b>How to analyze a HAR file?</b> Review HTTP status, load times, request timings, and failed requests.</li>
            <li><b>What is a HAR file used for?</b> Debug web traffic and analyze network performance.</li>
            <li><b>How to get a HAR file in Chrome?</b> Use Chrome DevTools → Network tab → Preserve log → Record → Export HAR.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}
