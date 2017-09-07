
public class Nexus extends Entity implements IEntity {
	public int side;
	private Map map;
	private int spawn;
	
	protected Nexus(Map m, int s, int x, int y) {
		side = s;
		map = m;
		this.spawn = 200;
		this.x = x;
		this.y = y;
	}
	
	public Boolean think() {
		if (this.spawn > 20) {
			map.add(new Worker(map, side, this.x, this.y))
				.add(new Worker(map, side, this.x, this.y))
				.add(new Warrior(map, side, this.x, this.y));
			this.spawn = 0;
			return (false);
		} else {
			this.spawn += 1;
		}
		return (true);
	}
}
