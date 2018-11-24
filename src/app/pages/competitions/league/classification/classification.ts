import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AppConfig } from '../../../../app.config';
import { Login, Student, Role, Competition, Journey, Match, Team, Point, PointRelation, School } from '../../../../shared/models/index';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { LoadingService, UtilsService, AlertService, TeamService, CompetitionService,
   JourneyService, PointRelationService, PointService, SchoolService, GroupService } from '../../../../shared/services/index';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.html',
  styleUrls: ['./classification.scss']
})
export class ClassificationComponent implements OnInit {

  public competition: Competition;
  public competitionId: string;
  public modeIndividual: boolean;

  public journeys: Journey[];
  public participants: Participant[];
  public odd: boolean;
  public matchesJourneys: Array<Array<Match>>;

  // PREMIOS
    // BestParticipants
    public GroupIdAwards: string;
    public SchoolIdAwards: string;
      public Primer_name: string;
      public Primer_Id: string;
      public Segon_name: string;
      public Segon_Id: string;

    // Point
    public Primer_p_value: number; // Valor del punto que se le enviará al 1er clasificado
    public Primer_point: Point;
    public Primer_PointRelation: PointRelation;
    public Segon_p_value: number; // Valor del punto que se le enviará al 2do clasificado
    public Segon_point: Point;
    public Segon_PointRelation: PointRelation;


  public scores = new Array<Score>();
  public score: Score;

  constructor(public utilsService: UtilsService,
    public loadingService: LoadingService,
    public alertService: AlertService,
    public journeyService: JourneyService,
    public schoolService: SchoolService,
    public pointService: PointService,
    public pointRelationService: PointRelationService,
    public groupService: GroupService,
    public translateService: TranslateService,
    private route: ActivatedRoute,
    private teamService: TeamService,
    private competitionService: CompetitionService) {
      this.utilsService.currentUser = Login.toObject(localStorage.getItem(AppConfig.LS_USER));
      this.utilsService.role = Number(localStorage.getItem(AppConfig.LS_ROLE));
     }

  ngOnInit() {
    if (this.utilsService.role === Role.TEACHER || this.utilsService.role === Role.STUDENT) {
    this.loadingService.show();
    this.competitionId = this.route.snapshot.paramMap.get('id');
    this.getClassificationOfCompetition();
    }
  }

  getClassificationOfCompetition(): void {
    this.competitionService.getCompetition(this.competitionId)
    .subscribe( ((competition: Competition) => {
        this.competition = competition;
        this.getJourneys();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  getJourneys(): void {
    this.journeyService.getJourneysCompetition(this.competitionId).subscribe(
      ((journeys: Array<Journey>) => {
        this.journeys = journeys;
        this.getMatches();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
  }

  getMatches(): void {
    let countJourneys = 0;
    this.matchesJourneys = [];
    for (let _j = 0; _j < this.journeys.length; _j++) {
      this.matchesJourneys[_j] = [];
      this.journeyService.getMatchesJourneyDetails(this.journeys[_j].id, this.competition).subscribe(
      ((matches: Array<Match>) => {
        countJourneys = countJourneys + 1;
        for (let _m = 0; _m < matches.length; _m++) {
          this.matchesJourneys[_j][_m] = new Match();
          this.matchesJourneys[_j][_m] = matches[_m];
        }
         if ( countJourneys === this.journeys.length ) {
           this.getParticipants();
          }
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
    }
  }

  getParticipants(): void {
    this.participants = [];
    if (this.competition.mode === 'Individual') {
      this.modeIndividual = true;
      this.competitionService.getStudentsCompetition(this.competitionId)
      .subscribe(( (students: Array<Student>) => {
        if (students.length % 2 === 0 ) { this.odd = false; } else { this.odd = true; }
        for (let _s = 0; _s < students.length; _s++) {
          this.participants[_s] = {
            id: +students[_s].id,
            name: students[_s].name.concat(' ', students[_s].surname)
          };
        }
        this.getScores();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
      } else {
      this.modeIndividual = false;
      this.teamService.getTeamsCompetition(this.competitionId)
      .subscribe(( (teams: Array<Team>) => {
        if (teams.length % 2 === 0 ) { this.odd = false; } else { this.odd = true; }
        for (let _t = 0; _t < teams.length; _t++) {
          this.participants[_t] = {
            id: +teams[_t].id,
            name: teams[_t].name
          };
        }
        this.getScores();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
      }
  }

  getScores(): void {
      this.scores = [];
      for (let _p = 0; _p < this.participants.length; _p++) {
        this.score = { position: 0, name: this.participants[_p].name,
                       played: 0, won: 0, draw: 0, lost: 0, points: 0};
        for (let _j = 0; _j < this.journeys.length; _j++) {
          let found = false;
          for (let _m = 0; _m < this.matchesJourneys[_j].length && !found; _m++) {
            if ( +this.participants[_p].id === this.matchesJourneys[_j][_m].playerOne ||
            +this.participants[_p].id === this.matchesJourneys[_j][_m].playerTwo ) {
              if ( this.matchesJourneys[_j][_m].winner === +this.participants[_p].id ) {
                this.score.points = this.score.points + 3;
                this.score.won = this.score.won + 1;
                this.score.played = this.score.played + 1;
              } else if ( this.matchesJourneys[_j][_m].winner === 1 ) {
                this.score.points = this.score.points + 1;
                this.score.draw = this.score.draw + 1;
                this.score.played = this.score.played + 1;
              } else if ( this.matchesJourneys[_j][_m].winner === 2
              || this.matchesJourneys[_j][_m].winner === 0 ) {
              } else {
                this.score.lost = this.score.lost + 1;
                this.score.played = this.score.played + 1;
              }
              found = true;
            }
          }
        }
        this.scores.push(this.score);
      }
      this.scores.sort(function (a, b) {
        return (b.points - a.points);
      });
      for (let _s = 0; _s < this.scores.length; _s++) {
        this.scores[_s].position = _s + 1;
       }
       this.SetBestParticipants();
  }

  SetBestParticipants(): void {
    for (let _m = 0; _m < this.participants.length; _m++) {
      if (this.scores[0].name === this.participants[_m].name) {
        this.Primer_Id = this.participants[_m].id.toString();
      }
      if (this.scores[1].name === this.participants[_m].name) {
        this.Segon_Id = this.participants[_m].id.toString();
      }
    }
    this.Primer_name = this.competition.name.toString() + '_1er Clasificado_' + this.scores[0].name.toString();
    this.Segon_name = this.competition.name.toString() + '_2do Clasificado_' + this.scores[1].name.toString();
    this.GroupIdAwards = this.competition.groupId.toString();
    this.groupService.getMyGroupStudents(this.GroupIdAwards).subscribe(
      ( (students: Array<Student>) => {
        for (let _n = 0; _n < students.length; _n++) {
          if (this.Primer_Id === students[_n].id ) {
            this.SchoolIdAwards = students[_n].schoolId.toString();
          }
        }
        this.loadingService.hide();
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));

  }

  SendPoint1(): void {
    if (this.scores[0].points !== 0) {
      this.pointService.savePoint(this.Primer_name, this.Primer_p_value, 'url_image').subscribe(
        ((newPoint: Point) => {
          this.Primer_point = newPoint;
          this.SetPoint1();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    } else { this.alertService.show(this.translateService.instant('CLASSIFICATION.NOAWARDS')); }
  }

  SendPoint2(): void {
    if (this.scores[0].points !== 0) {
      this.pointService.savePoint(this.Segon_name, this.Segon_p_value, 'url_image').subscribe(
        ((newPoint: Point) => {
          this.Segon_point = newPoint;
          this.SetPoint2();
        }),
        ((error: Response) => {
          this.loadingService.hide();
          this.alertService.show(error.toString());
        }));
    } else { this.alertService.show(this.translateService.instant('CLASSIFICATION.NOAWARDS')); }
  }

  SetPoint1(): void {
    this.pointRelationService.postPointRelation(this.Primer_point.id, this.Primer_Id, this.SchoolIdAwards,
    this.GroupIdAwards, 1).subscribe(
    ((responsePointRelation: PointRelation) => {
      this.Primer_PointRelation = responsePointRelation;
      this.loadingService.hide();
      this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
    }),
    ((error: Response) => {
      this.loadingService.hide();
      this.alertService.show(error.toString());
    }));
  }

  SetPoint2(): void {
    this.pointRelationService.postPointRelation(this.Segon_point.id, this.Segon_Id, this.SchoolIdAwards,
      this.GroupIdAwards, 1).subscribe(
      ((responsePointRelation: PointRelation) => {
        this.Primer_PointRelation = responsePointRelation;
        this.loadingService.hide();
        this.alertService.show(this.translateService.instant('POINTS.CORASSIGN'));
      }),
      ((error: Response) => {
        this.loadingService.hide();
        this.alertService.show(error.toString());
      }));
    }


}

export interface Score {
  position: number;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  points: number;
}

export interface Participant {
  id: number;
  name: string;
}
