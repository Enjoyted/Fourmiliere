
public class Food extends Entity implements IEntity {
	public int stock;

	protected Food(float x, float y) {
		this.x = x;
		this.y = y;
		this.stock = 50 + Seed.random(200);
		log.write("log/game", "spawn food");
	}
	
	public Boolean think() {
		//System.out.print("Food\n");
		return (true);
	}
}
