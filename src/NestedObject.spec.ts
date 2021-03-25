import NestedObject from './NestedObject';
import Keyable from './KeyableInterface';

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

test('[JUPITER] NestedOject overrides property value if needed ', () => {
    // NestedObject.assign(data, 'Poet', 'people__address__profession');
    // expect(data).toEqual({
    //     car: 'Subaru',
    //     people: {
    //         profession: 'Poet',
    //         address: {
    //             street: 'Sesame Street 21',
    //             city: 'New York'
    //         }
    //     }
    // });
});
// SATURN, URANUS, NEPTUNE
