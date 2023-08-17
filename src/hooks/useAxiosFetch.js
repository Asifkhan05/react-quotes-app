import { useState, useEffect } from "react";
import axios from "axios";

function useAxiosFetch(dataURL) {
  let [data, reData] = useState([]);
  let [fetchError, reFetchError] = useState(null);
  let [isLoading, reIsloading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    let fetchData = async (url) => {
      reIsloading(true);
      try {
        let responce = await axios.get(url, { cancelToken: source.token });
        if (isMounted) {
          reData(responce.data);
          reFetchError(null);
        }
      } catch (err) {
        if (isMounted) {
          reFetchError(err.message);
          reData([]);
        }
      } finally {
        isMounted && setTimeout(() => reIsloading(false), 2000);
      }
    };
    fetchData(dataURL);
    let clean = () => {
      isMounted = false;
      source.cancel();
    };
    return clean;
  }, [dataURL]);

  return { data, isLoading, fetchError };
}
export default useAxiosFetch;
