import { useEffect, useRef, useState } from "react";

// Styles
import "./QrReader.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../assets/qr-frame.svg";
import QrCodeList from "./QrCodeList";

const QrReader = () => {
  // QR States
  const scanner = useRef();
  const videoEl = useRef(null);
  const qrBoxEl = useRef(null);
  const [qrOn, setQrOn] = useState(true);
  const [scannedCodes, setScannedCodes] = useState([]);

  // Result
  const [scannedResult, setScannedResult] = useState("");

  // Success
  const onScanSuccess = (result) => {
    // 🖨 Print the "result" to browser console.
    // console.log(result);
    // {data: "https://install.appcenter.ms/orgs/arta-baria/apps/qr-app/distribution_groups/develop"}
    // ✅ Handle success.
    // 😎 You can do whatever you want with the scanned result.
    setScannedResult(result?.data);
    if (result?.data && result?.data !== "") {
      updateReadings(result?.data);
    }
  };

  // Fail
  const onScanFail = (err) => {
    // 🖨 Print the "err" to browser console.
    // alert("QR error", JSON.stringify(err));
    console.log(err);
  };

  useEffect(() => {
    console.log(" 👉 Instantiate the QR Scanner");
    if (videoEl?.current && !scanner.current) {
      // 👉 Instantiate the QR Scanner
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
        preferredCamera: "environment",
        // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
        highlightScanRegion: true,
        // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
        highlightCodeOutline: true,
        // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
        overlay: qrBoxEl?.current || undefined,
        maxScansPerSecond: 1,
      });

      // 🚀 Start QR Scanner
      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    // 🧹 Clean up on unmount.
    // 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  // ❌ If "camera" is not allowed in browser permissions, show an alert.
  useEffect(() => {
    if (!qrOn)
      alert("Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.");
  }, [qrOn]);

  const updateReadings = (value) => {
    console.log("updateReadings", value);
    console.log("scannedCodes", scannedCodes);
    console.log()
    setScannedCodes(prev => [...prev, value]);
    // if (value) {
    //   if ((scannedCodes.length > 0) & scannedCodes.includes(value)) {
    //     console.log("duplicated value");
    //     return;
    //   }
    //   setScannedCodes([...scannedCodes, value]);
    // }
  };

  return (
    <div>
      <div className="qr-reader">
        {/* QR */}
        <video ref={videoEl}></video>
        <div ref={qrBoxEl} className="qr-box">
          <img src={QrFrame} alt="Qr Frame" width={256} height={256} className="qr-frame" />
        </div>

        {/* Show Data Result if scan is success */}
        {scannedResult && (
          <p
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 99999,
              color: "white",
            }}
          >
            Scanned Result: {scannedResult}
          </p>
        )}
      </div>
      <div> total: {scannedCodes.length}</div>
      { scannedCodes && scannedCodes.length > 0 && <QrCodeList codes={scannedCodes} /> }

    </div>
  );
};

export default QrReader;
