import React, {FC, PropsWithChildren, useContext} from 'react';
import Toast, {ToastShowParams} from 'react-native-toast-message';

export interface ToastProviderProps {
  showToast: (p: ToastShowParams) => void;
}
const ToastContext = React.createContext<ToastProviderProps>({
  showToast: () => {},
});

export const ToastProvider: FC<PropsWithChildren> = ({children}) => {
  const showToast = (p: ToastShowParams) => {
    Toast.show(p);
  };
  return (
    <ToastContext.Provider value={{showToast}}>
      {children}
    </ToastContext.Provider>
  );
};
export const useToastContext = () => useContext(ToastContext);
