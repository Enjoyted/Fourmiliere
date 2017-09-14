
public class Water extends Entity implements IEntity {
	public int stock;

	protected Water(float x, float y) {
		this.x = x;
		this.y = y;
		this.stock = 50 + Seed.random(200);
		log.write("log/game", "spawn water");
	}
	
	public Boolean think() {
		//System.out.print("Water\n");
		return (true);
	}
}
