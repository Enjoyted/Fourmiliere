
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;

public class Map extends Base {
	private static Map instance = null;
	private int frame;
	private int size;
	
	public List<IEntity> entity;
	protected Map() {}
	public static Map getInstance() {
		if(instance == null) {
			instance = new Map();
		}
		return instance;
	}
	
	public Map add(IEntity e) {
		entity.add(e);
		return (this);
	}
	
	public void startup() {
		size = 64;
		frame = 5000;

		log.write("log/setup", "setup map size " + size);
		log.write("log/setup", "setup game length " + frame);
		entity = new ArrayList<IEntity>();

		entity.add(new Nexus(this, 1, Seed.random(size), Seed.random(size)));
		entity.add(new Nexus(this, 2, Seed.random(size), Seed.random(size)));
		entity.add(new Water(Seed.random(size), Seed.random(size)));
		entity.add(new Water(Seed.random(size), Seed.random(size)));
		entity.add(new Food(Seed.random(size), Seed.random(size)));
		entity.add(new Food(Seed.random(size), Seed.random(size)));
	}
	
	public Boolean think() {
		log.write("log/game", "think");
		for(Object i : entity) {
			if(i instanceof Nexus) {
				if (!((Nexus)i).think()) {
					log.write("log/game", "skip nexus");
					return (true);
				}
			}
			if(i instanceof Food) {
				((Food)i).think();
			}
			
			if(i instanceof Water) {
				((Water)i).think();
			}
			
			if(i instanceof Worker) {
				if (!((Worker)i).think()) {
					log.write("log/game", "skip worker");
					return (true);
				}
			}

			if(i instanceof Warrior) {
				if (!((Warrior)i).think()) {
					log.write("log/game", "skip Warrior");
					return (true);
				}
			}
		}

		return (false);
	}
	
	public Boolean draw() {
		String base = "";
		for (int i = 0; i < this.size; i++) {
			for (int k = 0; k < this.size; k++) {
				base += ".";
			}
			base += '\n';
		}

		int[] count = new int[]{0, 0, 0};
		
		int s = this.size + 1, side = -1;
		StringBuilder image = new StringBuilder(base);
		for(Object i : entity) {
			if(i instanceof Nexus) {
				Nexus n = (Nexus)i;
				count[0] += 1;
				side = n.side;
				image.setCharAt((Math.round(n.y) * s) + Math.round(n.x), 'n');
			}
			
			if(i instanceof Water) {
				Water w = (Water)i;
				if (w.stock > 0) {
					image.setCharAt((Math.round(w.y) * s) + Math.round(w.x), 'w');
				}
			}
			
			if(i instanceof Food) {
				Food f = (Food)i;
				if (f.stock > 0) {
					image.setCharAt((Math.round(f.y) * s) + Math.round(f.x), 'f');
				}
			}
			
			if(i instanceof Worker) {
				Worker a = (Worker)i;
				count[1] += 1;
				image.setCharAt((Math.round(a.y) * s) + Math.round(a.x), 'a');
			}

			if(i instanceof Warrior) {
				Warrior a2 = (Warrior)i;
				count[2] += 1;
				image.setCharAt((Math.round(a2.y) * s) + Math.round(a2.x), 'x');
			}
		}

		log.write("log/game", "count Nexus " + count[0]);
		log.write("log/game", "count Worker " + count[1]);
		log.write("log/game", "count Warrior " + count[2]);
		log.write("log/game", "Draw frame " + frame);
		log.write("log/game", image.toString());
		System.out.print(image);

		if (count[0] == 1) {
			System.out.print(side + " has won the match");
			log.write("log/game", side + " has won the match");
			return (false);
		}
		
		frame -= 1;
		return (frame > 0);
	}
}
