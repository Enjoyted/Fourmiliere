
import java.util.Iterator;
import java.util.Arrays;
import java.util.HashMap;
import java.io.*;

public class Logs {
	private static final HashMap<String, FileWriter> fileMap;
    static {
        fileMap = new HashMap<String, FileWriter>();
    }
	
	public Logs() {
		// empty
	}
 
	private static Logs handle = null;
 
	public static Logs getInstance() {			
		if (handle == null){
			handle = new Logs();	
		}
		return (handle);
	}

	public Logs write(String project, String txt) {
		try {
			FileWriter handle = fileMap.get(project);
			if (handle == null) {
				handle = new FileWriter(project, true);
				fileMap.put(project, handle);
			}
			handle.write(txt + "\n");
		} catch (Throwable t) {
			t.printStackTrace (System.out);				
		}
		return (this);
	}
	
	public void close() {
		try {
			for (HashMap.Entry<String, FileWriter> entry : fileMap.entrySet()) {
				//Integer key = entry.getKey();
				entry.getValue().close();
			}
		} catch (Throwable t) {
			t.printStackTrace (System.out);				
		}	
	}
}
