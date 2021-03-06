export class Ferrytrips {
    timetable: RouteTimetable = new RouteTimetable();
    trip: RouteTrip = new RouteTrip();
}

export class Route {
    id: number;
    name: string;
}
export class RouteTimetable {
    id: number;
    departure_a: any;
    boarding_a: any;
    departure_b: any;
    boarding_b: any;
    status: boolean;
    isOnTime: boolean;
    isFull: boolean;
    location_id: number;
    color_isOntime: string = 'dark';
    color_isFull: string = 'dark';
    time_depart: string;
}

export class RouteTrip {
    id: number;
    route_id: number;
    service_date: string;
    route_timetable_id: number;
    isOnTime: boolean;
    isFull: boolean;
    location_id: number;
    color_isOntime: string = 'dark';
    color_isFull: string = 'dark';
    time_depart: string;
    update_by: string;
    status: boolean;
}
