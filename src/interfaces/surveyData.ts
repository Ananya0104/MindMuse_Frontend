// Define SurveyData type for backend payload
export interface SurveyData {
  surveyName: string;
  month: string;
  platform: string;
  questionAnswer: {
    question: string;
    answer: string;
    elements: string[];
  }[];
}