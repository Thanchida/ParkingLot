import Motorcycle from '@/models/Motorcycle';
import Car from '@/models/Car';
import Bus from '@/models/Bus';
import Vehicle from '@/models/Vehicle';

export default class VehicleFactory {
  create(type) {
    switch (type) {
      case 'Motorcycle':
        return new Motorcycle();
      case 'Car':
        return new Car();
      case 'Bus':
        return new Bus();
      default:
        return new Vehicle(type, 'UNKNOWN');
    }
  }
}
