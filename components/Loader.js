import React, { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import styles from "@/styles/loading.module.css";

function Loader() {
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setLoader(false);
  }, []);

  return (
    <>
      {loader && (
        <div className={styles.loading_container}>
          <PulseLoader color="#0075ff" />
        </div>
      )}
    </>
  );
}

export default Loader;
