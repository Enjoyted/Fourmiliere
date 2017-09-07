
import java.util.Arrays;
import java.lang.Thread;

public class Core {
	public static Map map = new Map();
	public static Boolean run;
	
	public static void main(String args[]) {
		CliParser parser = new CliParser(args);
		run = true;
		try {
			map.startup();
			
			while (run) {
				System.out.print("\033c");
				run = map.think();
				map.draw();
				Thread.sleep(100);
			}
		} catch (Exception e) {
			System.out.println(e);
		}
		
		(new Logs()).close();
	}
}
