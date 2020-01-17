import moment from 'moment';
import {
  generateMerchantId, generateUserId, generateProductId, generateItemId, generateRouteId,
} from './generateIds';
import { DELIVERY_STATUS, ORDER_STATUS } from '../Constants';

export const mockMeals = [
  {
    itemId: generateItemId(),
    name: '双料组合 油面筋塞肉&萝卜炖牛腩套餐',
    quantity: 15,
    price: 10,
  },
  {
    itemId: generateItemId(),
    name: '鱼蛙锅套餐',
    quantity: 10,
    price: 8,
  },
  {
    itemId: generateItemId(),
    name: '上海辣肉面',
    quantity: 10,
    price: 12,
  },
  {
    itemId: generateItemId(),
    name: '麻辣烫套餐 微辣',
    quantity: 10,
    price: 10,
  },
  {
    itemId: generateItemId(),
    name: '红烧肉油豆腐卤蛋套餐',
    quantity: 5,
    price: 8,
  },
  {
    itemId: generateItemId(),
    name: '红烧肉油豆腐卤蛋套餐',
    quantity: 5,
    price: 11,
  },
];
const names = [
  '付小小',
  '曲丽丽',
  '林东东',
  '周星星',
  '吴加好',
  '朱偏右',
  '鱼酱',
  '乐哥',
  '谭小仪',
  '仲尼',
];

// eslint-disable-next-line import/prefer-default-export
export const mockDriverId = 'c16f69bda0e79723836cdf75';

export const mockRoutes = [
  {
    dealId: generateProductId(),
    locations: [
      {
        locationId: generateLocationId(),
        name: 'UCSD (PC) Gilman Parking门口',
        alias: 'UCSD',
        startTime: '2019-07-31 18:00',
        endTime: '2019-07-31 18:15',
        longitude: -117.233874,
        latitude: 32.877576,
        status: DELIVERY_STATUS[2],
        orders: fakeOrderDetails(10),
      },
      {
        locationId: generateLocationId(),
        name: 'Villas of Renaissance',
        alias: 'VoR',
        startTime: '2019-07-31 18:25',
        endTime: '2019-07-31 18:35',
        longitude: -117.202470,
        latitude: 32.871198,
        status: DELIVERY_STATUS[1],
        orders: fakeOrderDetails(15),
      },
      {
        locationId: generateLocationId(),
        name: 'Mesa Uueva Graduate Community at UCSD',
        alias: 'Mesa',
        startTime: '2019-07-31 18:15',
        endTime: '2019-07-31 18:25',
        longitude: -117.223255,
        latitude: 32.875356,
        status: DELIVERY_STATUS[0],
        orders: fakeOrderDetails(8),
      }
    ]
  },
  {
    dealId: generateProductId(),
    locations: [
      {
        locationId: generateLocationId(),
        name: 'Regents La Jolla (office)',
        alias: 'Regents',
        startTime: '2019-07-31 18:30',
        endTime: '2019-07-31 18:45',
        longitude: -117.217898,
        latitude: 32.874379,
        status: DELIVERY_STATUS[0],
        orders: fakeOrderDetails(20),
      },
      {
        locationId: generateLocationId(),
        name: 'Costa Verde Village',
        alias: 'CV',
        startTime: '2019-07-31 18:00',
        endTime: '2019-07-31 18:15',
        longitude: -117.216800,
        latitude: 32.870452,
        status: DELIVERY_STATUS[0],
        orders: fakeOrderDetails(10),
      }
    ]
  },
  {
    dealId: generateProductId(),
    locations: [
      {
        locationId: generateLocationId(),
        name: 'Vons',
        alias: 'Vons',
        startTime: '2019-07-31 18:30',
        endTime: '2019-07-31 18:45',
        longitude: -117.223489,
        latitude: 32.862989,
        status: DELIVERY_STATUS[0],
        orders: fakeOrderDetails(10),
      },
      {
        locationId: generateLocationId(),
        name: 'La Jolla Palms Apartments',
        alias: 'Palms',
        startTime: '2019-07-31 18:55',
        endTime: '2019-07-31 19:10',
        longitude: -117.223598,
        latitude: 32.870234,
        status: DELIVERY_STATUS[0],
        orders: fakeOrderDetails(10),
      }
    ]
  }
];

export const mockDriver = {
  driverId,
  name: '齐齐大佬',
  phone: '(415) 555-2671',
  restaurant: {
    restaurantId: generateMerchantId(),
  },
  routes: mockRoutes,
};

function fakeOrderDetails(count) {
  const list = [];
  for (let i = 0; i < count; i += 1) {
    list.push({
      orderId: generateOrderId(),
      items: [getRandom(mockMeals), getRandom(mockMeals)],
      customer: {
        userId: generateUserId(),
        username: names[i % 10],
        firstName: '',
        lastName: '',
        phone: '(XXX)-XXX-XXXX',
      },
      status: ORDER_STATUS[i % 6],
    });
  }
  return list;
}

export function getRandom(array) {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}

export const mockOrderDetails = fakeOrderDetails(10);

export const mockDeals = [
  {
    dealId: generateProductId(),
  },
  {
    dealId: generateProductId(),
  },
];

export function generateRandomString(length, charactersPool) {
  let result = '';
  const characters = charactersPool || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < length; i += 1) {
    result += getRandom(characters);
  }
  return result;
}

export function generateLocationId() {
  const characters = '0123456789';
  return generateRandomString(7, characters);
}

export function generateOrderId() {
  const characters = '0123456789';
  const prefix = generateRandomString(3, characters);
  const rand1 = generateRandomString(7, characters);
  const rand2 = generateRandomString(7, characters);
  return `${prefix}-${rand1}-${rand2}`;
}
