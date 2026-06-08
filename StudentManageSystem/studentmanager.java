package heima002;

import java.util.ArrayList;
import java.util.Scanner;

public class studentmanager {
    public static void main(String[] args) {
        ArrayList<Student> stulist = new ArrayList<>();
        while (true) {
            System.out.println("------欢迎来到学生管理系统------");
            System.out.println("1.添加学生");
            System.out.println("2.删除学生");
            System.out.println("3.查询学生");
            System.out.println("4.修改学生");
            System.out.println("5.退出");
            System.out.println("请输入选项");
            Scanner sc = new Scanner(System.in);
            String choose = sc.next();
            switch (choose) {
                case "1" -> addstudent(stulist);
                case "2" -> deletestudent(stulist);
                case "3" -> findstudent(stulist);
                case "4" -> changestudent(stulist);
                case "5" -> System.exit(0);
                default -> System.out.println("无选项");
            }
        }
    }

    public static void addstudent(ArrayList<Student> stulist) {
        Student student = new Student();
        Scanner sc = new Scanner(System.in);
        while (true) {
            System.out.println("请输入id");
            String stuid = sc.next();
            boolean flag = contains(stulist, stuid);
            if (flag) {
                System.out.println("学号重复，重新输入");
            } else {
                student.setId(stuid);
                break;
            }
        }
        System.out.println("请输入姓名");
            String stuname = sc.next();
            student.setName(stuname);

            System.out.println("请输入年龄");
            int age = sc.nextInt();
            student.setAge(age);

            stulist.add(student);
            System.out.println("添加成功");
        }

    public static void deletestudent(ArrayList<Student> stulist) {
       Scanner sc = new Scanner(System.in);
        System.out.println("请输入要删除的id");
       String sid=sc.next();
       boolean flag =contains(stulist,sid);
       if (flag) {
           for (int i = 0; i < stulist.size(); i++) {
               if (stulist.get(i).getId().equals(sid)) {
                   stulist.remove(i);
               }
               System.out.println("删除成功");
               break;
           }
       } else {
           System.out.println("无该学生信息");
           return;
       }
    }

    public static void findstudent(ArrayList<Student> stulist) {
        if (stulist.size() == 0) {
            System.out.println("暂无学生信息");
            return;
        }
        System.out.println("id\t\t\t姓名\t年龄");
        for (int i = 0; i < stulist.size(); i++) {
            Student s=stulist.get(i);
            System.out.println(s.getId()+"\t"+s.getName()+"\t"+s.getAge());
        }
        }

    public static void changestudent(ArrayList<Student> stulist) {
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入要更改的学生id");
        String sid=sc.next();
        boolean flag =contains(stulist,sid);
        if (flag) {
            for (int i = 0; i < stulist.size(); i++) {
                if (stulist.get(i).getId().equals(sid)) {
                    System.out.println("请输入新的姓名");
                    String sname = sc.next();
                    stulist.get(i).setName(sname);
                    System.out.println("请输入新的年龄");
                    int sage = sc.nextInt();
                    stulist.get(i).setAge(sage);
                    System.out.println("修改成功");
                    break;
                }
            }
        } else {
            System.out.println("无该学生信息");
            return;
        }
    }
    public static boolean contains(ArrayList<Student> stulist, String id) {
        for (int i = 0; i < stulist.size(); i++) {
            Student s=stulist.get(i);
            String sid=s.getId();
            if(sid.equals(id)) return true;
        }
        return false;
    }

}