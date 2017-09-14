
public class Warrior extends Entity implements IEntity {
	private Map map;
	public Nexus nexus;

	protected Warrior(Map m, Nexus n, float x, float y) {
		this.map = m;
		this.nexus = n;
		this.x = x;
		this.y = y;
		log.write("log/game", "spawn warrior " + n.side);
	}

	private Boolean attack(Entity b) {
		if (b.x == Math.round(x) && b.y == Math.round(y)) {
			if (Seed.random(2) == 1) {
				return (true);
			}
		} else {
			nextPos(1, b.x, b.y);
		}
		return (false);
	}
	
	public Boolean think() {
		for(Object i : map.entity) {
			if (i instanceof Worker) {
				Worker a = (Worker) i;
				if (a.nexus != nexus) {
					if (attack(a)) {
						map.entity.remove(i);
						return (false);
					}
					return (true);
				}
			}
		}

		for(Object i : map.entity) {
			if (i instanceof Warrior) {
				Warrior b = (Warrior) i;
				if (b.nexus != nexus) {
					if (attack(b)) {
						map.entity.remove(i);
						return (false);
					}
					return (true);
				}
			}
		}

		for(Object i : map.entity) {
			if (i instanceof Nexus) {
				Nexus c = (Nexus)i;
				if (c != nexus) {
					if (c.x == Math.round(x) && c.y == Math.round(y)) {
						if (c.health > 0) {
							c.health -= 1;
						} else {
							map.entity.remove(i);
							return (false);
						}
					} else {
						nextPos(1, c.x, c.y);
					}
					return (true);
				}
			}
		}

		nextPos(1, x + (Seed.random(20) - 10), y + (Seed.random(20) - 10));
		return (true);
	}
}
