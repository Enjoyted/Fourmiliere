
public class Worker extends Entity implements IEntity {
	private Map map;
	private int age;
	public Nexus nexus;
	
	protected Worker(Map m, Nexus n, float x, float y) {
		this.map = m;
		this.nexus = n;
		this.age = 0;
		this.x = x;
		this.y = y;
		log.write("log/game", "spawn worker " + n.side);
	}

	public Boolean think() {
		nexus.health = Math.min(100, nexus.health + 1);

		if (age > 500) {
			for(Object i : map.entity) {
				if(i instanceof Worker) {
					Worker w = (Worker)i;
					if (w == this) {
						map.entity.remove(i);
						return (false);
					}
				}
			}
		}
		this.age += 1;

		for(Object i : map.entity) {
			if(i instanceof Food) {
				Food f = (Food)i;
				if (f.stock > 0) {
					if (f.x == Math.round(x) && f.y == Math.round(y)) {
						f.stock -= 1;
						nexus.food += 1;
					} else {
						nextPos(1, f.x, f.y);
					}
					return (true);
				}
			}
			
			if(i instanceof Water) {
				Water w = (Water)i;
				if (w.stock > 0) {
					if (w.x == Math.round(x) && w.y == Math.round(y)) {
						w.stock -= 1;
						nexus.water += 1;
					} else {
						nextPos(1, w.x, w.y);
					}
					return (true);
				}
			}
		}

		nextPos(1, x + (Seed.random(20) - 10), y + (Seed.random(20) - 10));
		return (true);
	}
}
