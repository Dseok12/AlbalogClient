import { SetShop } from 'modules/shop';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { getShopInfoByAdmin, getShopInfoByParttime } from 'utils/api/shop';

export default function useShopInfoEffect() {
  const match = useRouteMatch();
  const shopId = match.params.shop;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const shop = useSelector((state) => state.shop);

  const getDataByAdmin = useCallback(async () => {
    const shopInfo = await getShopInfoByAdmin(shopId);
    dispatch(SetShop(shopInfo));
  }, [dispatch, shopId]);

  const getDataByParttime = useCallback(async () => {
    const shopInfo = await getShopInfoByParttime(shopId);
    let body = {
      _id: shopInfo._id,
      name: shopInfo.name,
      notices: [...shopInfo.notices.reverse()],
      workManuals: shopInfo.workManuals,
      address: shopInfo.address,
      phone_number: shopInfo.phone_number,
      postal_code: shopInfo.postal_code,
      employees: shopInfo.employees,
    };
    dispatch(SetShop(body));
  }, [dispatch, shopId]);

  useEffect(() => {
    if (!shop._id) {
      if (user.role === 'owner') getDataByAdmin();
      if (user.role === 'staff') getDataByParttime();
    }
  }, [shop._id, user.role, getDataByParttime, getDataByAdmin]);

  return {
    user,
    shop,
  };
}
