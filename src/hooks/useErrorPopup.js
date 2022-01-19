import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { createPopup } from '../reducers/popup';

export const useErrorPopup = (error) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(
        createPopup({
          text: error,
          isError: true,
        }),
      );
    }
  }, [error]);

  // return () => {};
};
