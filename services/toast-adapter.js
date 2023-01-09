import {toast} from 'react-toastify';

export function toastError(params) {
  toast.error(`${params}`);
}

export function toastSuccess(params) {
  toast.success(`${params}`);
}
