export const validateFilter = ({ filter , meta }) => {
  const expectedFormat = ['json', 'csv'];

  if (typeof filter !== 'object') {
    throw new Error(`filter should be an object`);
  }
  if (typeof meta !== 'object') {
    throw new Error(`meta should be an object`);
  }

  let { format, archive } = meta;

  if (typeof archive === 'undefined') {
    archive = false;
  }
  if (typeof format === 'undefined') {
    format = 'json';
  }
  if (typeof archive !== 'boolean') {
    throw new Error(`archive should be an boolean`);
  }
  if (format && typeof format !== 'string') {
    throw new Error(`format should be an string`);
  }
  if (!expectedFormat.includes(format)) {
    throw new Error(`format contains unexpected data`);
  }

  const { name, phone, address, email } = filter;

  if (name && typeof name !== 'object') {
    throw new Error(`name should be an object`);
  } else if (name) {
    const { first, last } = name;

    if (first && typeof first !== 'string') {
      throw new Error(`first should be an string`);
    }
    if (last && typeof last !== 'string') {
      throw new Error(`last should be an string`);
    }
  } else {
    filter.name = {};
  }
  if (phone && typeof phone !== 'string') {
    throw new Error(`phone should be an string`);
  }
  if (address && typeof address !== 'object') {
    throw new Error(`address should be an object`);
  } else if (address) {
    const { zip, city, country, street } = address;

    if (zip && typeof zip !== 'string') {
      throw new Error(`zip should be an string`);
    }
    if (city && typeof city !== 'string') {
      throw new Error(`city should be an string`);
    }
    if (country && typeof country !== 'string') {
      throw new Error(`country should be an string`);
    }
    if (street && typeof street !== 'string') {
      throw new Error(`street should be an string`);
    }
  } else {
    filter.address = {};
  }
  if (email && typeof email !== 'string') {
    throw new Error(`email should be an string`);
  }

  return { filter, meta: { format, archive } };
};

export const filterData = (users, filter) =>
  users.filter((user) => {
    const {
      name: {
        first = '',
        last = ''
      },
      phone = '',
      address: {
        zip = '',
        city = '',
        country = '',
        street = ''
      },
      email = ''
    } = filter;
    const {
      name: {
        first: userFirst = '',
        last: userLast = ''
      },
      phone: userPhone = '',
      address: {
        zip: userZip = '',
        city: userCity = '',
        country: userCountry = '',
        street: userStreet = ''
      },
      email: userEmail = ''
    } = user;

    return userFirst.includes(first) &&
      userLast.includes(last) &&
      userPhone.includes(phone) &&
      userZip.includes(zip) &&
      userCity.includes(city) &&
      userCountry.includes(country) &&
      userStreet.includes(street) &&
      userEmail.includes(email)
  });

export const createCSV = (data) => {
  let str = 'first;last;phone;zip;city;country;street;email\n';

  data.forEach((user) => {
    const {
      name: {
        first = '',
        last = ''
      },
      phone = '',
      address: {
        zip = '',
        city = '',
        country = '',
        street = ''
      },
      email = ''
    } = user;

    str += `${first};${last};${phone};${zip};${city};${country};${street};${email}\n`;
  });

  return str;
};
