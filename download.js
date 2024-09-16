downloadVideo = async function() {
  const pattern = /(https:\/\/)d1(\.vnecdn\.net\/vnexpress\/video)\/video(\/web\/mp4)\/[,0-9p]+(.+)\/vne\/master\.m3u8/
  const resources = performance.getEntriesByType('resource')
  const urls = resources
  	.filter(r => /master\.m3u(8?)$/.test(r.name))
    .map(r => r.name.replace(pattern, "$1v$2$3$4.mp4"))
  for (let u of urls) {
    try {
      // Fetch the video
      const response = await fetch(u)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      // Convert the response to a Blob
      const videoBlob = await response.blob()

      // Create a URL for the Blob
      const url = URL.createObjectURL(videoBlob)

      // Create a link element
      const link = document.createElement('a')
      link.href = url;
      link.target = '_blank'
      link.download = ''; // Set default the filename

      // Append the link to the body (required for Firefox)
      document.body.appendChild(link);

      // Trigger the download
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Release the Blob URL
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  }
}

downloadVideo().then(() => {})
