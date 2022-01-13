import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { destroyPopup } from '../../reducers/popup';

export const BottomPopup = ({ text, isError }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(destroyPopup());
    }, 5 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div className="bottom-popup">{text}</div>;
};
