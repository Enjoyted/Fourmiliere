
public class Nexus extends Entity implements IEntity {
	public int side;
	public int food;
	public int water;
	private Map map;
	private int spawn;
	public int health;
	
	protected Nexus(Map m, int s, float x, float y) {
		side = s;
		map = m;

		log.write("log/game", "spawn nexus " + side);
		this.spawn = 200;
		this.food = 100;
		this.water = 100;
		this.health = 100;
		this.x = x;
		this.y = y;
	}
	
	public Boolean think() {
		if (this.spawn > 100) {
			map.add(new Worker(map, this, this.x, this.y))
				.add(new Worker(map, this, this.x, this.y))
				.add(new Warrior(map, this, this.x, this.y));
			this.spawn = 0;
			return (false);
		} else {
			if (food > 0 && water > 0) {
				this.spawn += 1;
				this.water -= 1;
				this.food -= 1;
			}
		}
		return (true);
	}
}
