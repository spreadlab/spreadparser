import NestedObject from './NestedObject';
import Keyable from '../KeyableInterface';

const newYorPersonWithSubaru = () => {
    return {
        car: 'Subaru',
        people: {
            profession: null,
            address: {
                city: 'New York'
            }
        }
    };
};
test('[MERCURY] NestedObject does exists', () => {
    expect(NestedObject).toBeDefined();
    expect(NestedObject.assign).toBeDefined();
});

test('[VENUS] NestedOject assign values as expected in empty object', () => {
    const data = {};
    NestedObject.assign(data, 'Sesame Street 21', 'people__address__street');
    expect(data).toEqual({
        people: {
            address: {
                street: 'Sesame Street 21'
            }
        }
    });
    NestedObject.assign(data, {name: 'bird'}, 'animal__type');
    expect(data).toEqual({
        animal: {
            type: {
                name: 'bird'
            }
        },
        people: {
            address: {
                street: 'Sesame Street 21'
            }
        }
    });
});

test('[EARTH] NestedOject assign values as expected in not empty object', () => {
    const data = newYorPersonWithSubaru();
    NestedObject.assign(data, 'Sesame Street 21', 'people__address__street');
    expect(data).toEqual({
        car: 'Subaru',
        people: {
            profession: null,
            address: {
                street: 'Sesame Street 21',
                city: 'New York'
            }
        }
    });
});

test('[MARS] When paths is not separated assign works as normal assign', () => {
   const data: Keyable = {};
   NestedObject.assign(data, 'John Doe', 'name');
   expect(data.name).toBe('John Doe');
   expect(data).toEqual({
       name: 'John Doe'
   });
});

test('[JUPITER] Combine repeated values into arrays ', () => {
    const data: Keyable = {
        country: 'Brasil',
        city: {
            name: 'São Paulo'
        }
    };

    NestedObject.assign(data, 'Fortaleza', 'city__name');
    NestedObject.assign(data, 'Bahia', 'city__state');
    NestedObject.assign(data, 'Curitiba', 'city__name');
    NestedObject.assign(data, 'RJ', 'states');
    NestedObject.assign(data, 'AM', 'states');
    NestedObject.assign(data, 'Jalapão', 'places');

    const expectation = {
        country: 'Brasil',
        city: {
            state: 'Bahia',
            name: ['São Paulo', 'Fortaleza', 'Curitiba']
        },
        states: ['RJ', 'AM'],
        places: 'Jalapão'
    };
    expect(data).toEqual(expectation);
    const empty: Keyable = {};

    NestedObject.assign(empty, 'Civil War', 'comics__marvel');
    NestedObject.assign(empty, 'House of M', 'comics__marvel');
    NestedObject.assign(empty, 'Thanos Quest', 'comics__marvel');
    NestedObject.assign(empty, 'Rebirth', 'comics__marvel');
    NestedObject.assign(empty, 'The Dark Knight', 'comics__dc');
    NestedObject.assign(empty, 'Zorba: The Greek', 'books');
    NestedObject.assign(empty, 'Walden', 'books');
    NestedObject.assign(empty, null, 'books');

    expect(empty).toEqual({
        comics: {
            marvel: ['Civil War', 'House of M', 'Thanos Quest', 'Rebirth'],
            dc: 'The Dark Knight'
        },
        books: ['Zorba: The Greek', 'Walden', null]
    });
});
// SATURN, URANUS, NEPTUNE
