
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;

public class Map extends Base {
	private static Map instance = null;
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
		entity = new ArrayList<IEntity>();
		entity.add(new Nexus(this, 1, Seed.random(size), Seed.random(size)));
		entity.add(new Nexus(this, 2, Seed.random(size), Seed.random(size)));
		entity.add(new Water(Seed.random(size), Seed.random(size)));
		entity.add(new Water(Seed.random(size), Seed.random(size)));
		entity.add(new Food(Seed.random(size), Seed.random(size)));
		entity.add(new Food(Seed.random(size), Seed.random(size)));
	}
	
	public Boolean think() {
		for(Object i : entity) {
			if(i instanceof Nexus) {
				if (!((Nexus)i).think()) {
					break;
				}
			}
			if(i instanceof Food) {
				((Food)i).think();
			}
			
			if(i instanceof Water) {
				((Water)i).think();
			}
			
			if(i instanceof Worker) {
				((Worker)i).think();
			}
		}
			
		return (true);
	}
	
	public void draw() {
		String base = "";
		for (int i = 0; i < this.size; i++) {
			for (int k = 0; k < this.size; k++) {
				base += ".";
			}
			base += '\n';
		}
		
		StringBuilder image = new StringBuilder(base);
		for(Object i : entity) {
			if(i instanceof Nexus) {
				Nexus n = (Nexus)i;
				image.setCharAt((n.y * (this.size + 1)) + n.x, 'n');
			}
			
			if(i instanceof Water) {
				Water w = (Water)i;
				image.setCharAt((w.y * (this.size + 1)) + w.x, 'w');
			}
			
			if(i instanceof Food) {
				Food f = (Food)i;
				image.setCharAt((f.y * (this.size + 1)) + f.x, 'f');
			}
			
			if(i instanceof Worker) {
				Worker a = (Worker)i;
				image.setCharAt((a.y * (this.size + 1)) + a.x, 'a');
			}
		}
		
		System.out.print(image);
	}
}
