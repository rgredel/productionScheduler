package pl.edu.pk.wieik.productionScheduler.schedule.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Builder
@ToString
@EqualsAndHashCode
public class ScheduleTask {
   private Long id;
   private String name;
   private String description;
   private int p; // qi - czas wykonania zadania
   private int q; // copy of p
   private int t; // czas wykonania zadania krytycznego
   private int d; // najpóźniejszy możliwy temin zakończenia zadania
   private int a; //liczba procesorów żadanych
   private int h; //liczba zadań w zbiorze E;
   private int w; // priorytet zadania w = a * p
   private List<ScheduleTask> E = new ArrayList<>(); //zadania poprzedzające

}
