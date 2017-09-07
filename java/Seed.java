import java.util.Random;

public class Seed extends Base {
	private static Random seed = new Random(1);
	
	public static int random(int i) {
		return (seed.nextInt(i));
	}
}