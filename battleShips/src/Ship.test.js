const Ship = require('./Ship');

describe('Ship ctor', () => {
    test('size didnt change', () => {
        const SHIP_SIZE = 4;
        const ship = new Ship(SHIP_SIZE);
        expect(ship.size).toBe(SHIP_SIZE);
    })
})

describe('Ship isAlive', () => {
    test('new ship should be alive', () => {
        const ship = new Ship(3);
        expect(ship.isAlive).toBe(true);
    })

    test('all ship hit', () => {
        const ship = new Ship(3);
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isAlive).toBe(false);
    })
})

describe('Ship hit()', () => {
    test('should return false for a hit ship', () => {
        const ship = new Ship(1);
        ship.hit(0);
        expect(ship.isAlive).toBe(false);
    })

    test('should throw an error for twice hit in the same place', () => {
        const ship = new Ship(3);
        expect(() => {
            ship.hit(1);
            ship.hit(1);
        }).toThrow();
    })

    test('should throw of hitting outside ship size', () => {
        const ship = new Ship(3);
        expect(() => {
            ship.hit(5);
        }).toThrow();
    })

    test('should throw of hitting just outside ship size', () => {
        const ship = new Ship(3);
        expect(() => {
            ship.hit(3);
        }).toThrow();
    })
})

describe('Ship onSink()', () => {
    test('should sink a ship sized 3', () => {
        const ship = new Ship(3);
        const onSink = jest.fn();

        ship.onSink = onSink;

        ship.hit(0);
        ship.hit(1);
        ship.hit(2);

        expect(ship.isAlive).toBe(false);
        expect(onSink.mock.call.length).toBe(1);
    })
    test('should sink a ship sized 3', () => {
        const arr = new Ship(3);
        const onSink = jest.fn();

        ship.onSink = onSink;

        ship.hit(0);
        ship.hit(1);
        ship.hit(2);

        expect(ship.isAlive).toBe(false);
        expect(onSink.mock.call.length).toBe(1);
    })
})