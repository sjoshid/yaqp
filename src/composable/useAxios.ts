import { ref, Ref } from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { bapi } from '../boot/axios.ts';

export function useAxios<RET = unknown>() {
  const data: Ref<RET | null> = ref(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const success = ref(false);

  const fetchData = async <REQ>(url: string, config?: AxiosRequestConfig<REQ>) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await bapi.get(url, config);
      data.value = response.data;
      success.value = true;
    } catch (err: never) {
      error.value = err.message || 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    success,
    fetchData,
  };
}
