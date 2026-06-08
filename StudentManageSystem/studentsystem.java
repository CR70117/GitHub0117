package heima002;

import java.util.ArrayList;
import java.util.Scanner;

public class studentsystem {
     static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
         ArrayList<User> list=new ArrayList<>();
        while (true) {
            System.out.println("欢迎来到学生管理系统");
            System.out.println("请选择操作：1登录 2注册 3忘记密码 4退出");
            String choose = sc.next();
            switch (choose) {
                case "1" -> login(list);
                case "2" -> register(list);
                case "3" -> forget(list);
                case "4" -> {
                    System.out.println("再见");
                    System.exit(0);
                }
                default -> System.out.println("没有这个选项");
            }
        }
    }

        private static void login(ArrayList<User> list) {
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入用户名");
            String username=sc.next();

        }
        private static void register(ArrayList<User> list) {
            Scanner sc= new Scanner(System.in);
            String username;
            String password;
            String ID;
            String phone;
            while (true) {
                System.out.println("请输入用户名");
                username=sc.next();
                boolean flag1=check(username);
                if(!flag1) {
                    System.out.println("用户名不可用");
                    continue;
                }
                boolean flag2=contains(list,username);
                if(flag2) {
                    System.out.println("用户名"+username+"已存在，请重新输入");
                } else {
                    System.out.println("用户名可用");
                    break;
                }
            }
            while (true) {
                System.out.println("请输入密码");
                password=sc.next();
                System.out.println("请再次输入密码");
                String password2=sc.next();
                if(!password.equals(password2)) {
                    System.out.println("两次输入的不一致，请重新输入");
                } else {
                    System.out.println("密码输入成功");
                    break;
                }
            }
            while (true) {
                System.out.println("请输入身份证号");
                ID=sc.next();
                boolean flag3=checkID(ID);
                if(flag3) {
                    System.out.println("身份证号码正确");
                    break;
                } else {
                    System.out.println("输入错误，请重新输入");
                    continue;
                }
            }
            while (true) {
                System.out.println("请输入手机号");
                phone=sc.next();
                boolean flag4=checkPhone(phone);
                if(flag4) {
                    System.out.println("手机号码输入成功");
                    break;
                } else {
                    System.out.println("手机号输入错误");
                    continue;
                }
            }
        User u=new User(username,password,ID,phone);
            list.add(u);
            System.out.println("注册成功");
            printList(list);
        }
        private static void printList(ArrayList<User> list) {
         for(int i=0;i<list.size();i++) {
             User user=list.get(i);
             System.out.println(user.getUsername()+","+user.getPassword()+","+user.getID()+","+user.getPhoneNumber());
         }
        }
        private static boolean checkPhone(String phone) {
         if(phone.length()!=11) {
             return false;
         }
         if(phone.startsWith("0")) {
             return false;
            }
            for (int i = 0; i < phone.length(); i++) {
            char c=phone.charAt(i);
            if(!(c>='0'&&c<='9')) {
                return false;
            }
            }
            return true;
        }
        private static boolean checkID(String ID) {
         if(ID.length()!=18) {
             return false;
         }
         if(ID.startsWith("0")) {
             return false;
         }
         for(int i=0;i<ID.length()-1;i++) {
             char c=ID.charAt(i);
             if(!(c>='0'&&c<='9')) {
                 return false;
             }
         }
         char endChar=ID.charAt(ID.length()-1);
         if((endChar>='0'&&endChar<='9')||(endChar=='x')||(endChar=='X')) {
             return true;
         } else  {
             return false;
         }
        }
        private static boolean contains(ArrayList<User> list,String username) {
            for (int i = 0; i < list.size(); i++) {
                User user=list.get(i);
                String rightname=user.getUsername();
                if(rightname.equals(username)) {
                    return true;
                }
            }
            return false;
        }
        private static boolean check(String username) {
         int len=username.length();
         if(len<3||len>15) {
             return false;
         }
         for(int i=0;i<len;i++) {
             char c = username.charAt(i);
             if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))) {
                 return false;
             }
         }
            int cnt1=0;
            int cnt2=0;
             for(int i=0;i<len;i++) {
                 char c=username.charAt(i);
                 if(c>='A' && c<='Z'||c>='a'&&c<='z') {
                     cnt1++;
                 }
                 if(c>='0' && c<='9') {
                     cnt2++;
                 }
             }
             return (cnt1>0&&cnt2>0);
        }
        private static void forget(ArrayList<User> list) {
            System.out.println("忘记密码");
        }

    }

