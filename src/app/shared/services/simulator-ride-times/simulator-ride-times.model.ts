export class SimulatorRideTime {
  public id: string;
  public time: string;
  public venue_id: string;
  public day: string;
  public round: string;
  public created_date: string;
  public modified_date: string;
  public simulator_time_status: string;

  constructor(
    id: string,
    time: string,
    venue_id: string,
    day: string,
    round: string,
    created_date: string,
    modified_date: string,
    simulator_time_status: string,
  ) {
    this.id = id;
    this.time = time;
    this.venue_id = venue_id;
    this.day = day;
    this.round = round;
    this.created_date = created_date;
    this.modified_date = modified_date;
    this.simulator_time_status = simulator_time_status;
  }
}
