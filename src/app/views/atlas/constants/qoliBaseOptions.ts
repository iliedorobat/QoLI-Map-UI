// downloaded from /stats/config?analysisType=individually
export default {
    filename: "qoli",
    label: "QoLI",
    aggregators: [
        {
            filename: "safety",
            label: "Economic and Physical Safety",
            aggregators: [
                {
                    filename: "safety:crimeRatio",
                    label: "Crime Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "safety:unpaidRatio",
                    label: "Non Payment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "safety:pensionPpsRatio",
                    label: "Pension in PPS Ratio",
                    negativeState: false,
                    units: "PPS per inhabitant"
                },
                {
                    filename: "safety:offencesComputers",
                    label: "Police-recorded Offences - Acts Against Computer Systems",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesAssault",
                    label: "Police-recorded Offences - Assaults",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesAttemptedHomicide",
                    label: "Police-recorded Offences - Attempted International Homicide",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesBribery",
                    label: "Police-recorded Offences - Bribery",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesBurglary",
                    label: "Police-recorded Offences - Burglary",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesBurglaryPrivate",
                    label: "Police-recorded Offences - Burglary of Private Residential Premises",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesCorruption",
                    label: "Police-recorded Offences - Corruption",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesFraud",
                    label: "Police-recorded Offences - Fraud",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesHomicide",
                    label: "Police-recorded Offences - International Homicide",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesKidnapping",
                    label: "Police-recorded Offences - Kidnapping",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesMoneyLaundering",
                    label: "Police-recorded Offences - Money Laundering",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesNarcotics",
                    label: "Police-recorded Offences - Narcotics",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesCriminalGroups",
                    label: "Police-recorded Offences - Participation in an Organized Criminal Group",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesRape",
                    label: "Police-recorded Offences - Rape",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesRobbery",
                    label: "Police-recorded Offences - Robbery",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesSexualAssault",
                    label: "Police-recorded Offences - Sexual Assault",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesSexualExploitation",
                    label: "Police-recorded Offences - Sexual Exploitation",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesSexualViolence",
                    label: "Police-recorded Offences - Sexual Violence",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesTheft",
                    label: "Police-recorded Offences - Theft",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:offencesTheftVehicle",
                    label: "Police-recorded Offences - Theft of a Motorized Vehicle or Parts of Thereof",
                    negativeState: true,
                    units: "number"
                },
                {
                    filename: "safety:socialProtectionPpsRatio",
                    label: "Social Protection in PPS Ratio",
                    negativeState: false,
                    units: "PPS per inhabitant"
                },
                {
                    filename: "safety:unexpectedRatio",
                    label: "Unexpected Ratio",
                    negativeState: true,
                    units: "%"
                }
            ]
        },
        {
            filename: "education",
            label: "Education",
            aggregators: [
                {
                    filename: "education:digitalSkillsRatio",
                    label: "Digital Skills Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "education:dropoutRatio",
                    label: "Dropout Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "education:earlyEducationRatio",
                    label: "Early Education Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "education:educationRatio",
                    label: "Education Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "education:inactiveYoungRatio",
                    label: "Inactive Young People Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "education:noKnownForeignLangRatio",
                    label: "No Foreign Language Known Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "education:pupilsRatio",
                    label: "Pupils Ratio",
                    negativeState: true,
                    units: "pupils per teacher"
                },
                {
                    filename: "education:trainingLastMonthRatio",
                    label: "Training Ratio (last 4 weeks)",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "education:trainingLastYearRatio",
                    label: "Training Ratio (last year)",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            filename: "governance",
            label: "Governance and Basic Rights",
            aggregators: [
                {
                    filename: "governance:citizenshipRatio",
                    label: "Citizenship Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "governance:genderEmpGap",
                    label: "Gender Employment Gap",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "governance:genderPayGap",
                    label: "Gender Pay Gap",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "governance:populationTrustOthersRatio",
                    label: "Population Trust in Others",
                    negativeState: false,
                    units: "Scores between 1 - 10"
                },
                {
                    filename: "governance:populationTrustLegtstRatio",
                    label: "Population Trust in The Legal System",
                    negativeState: false,
                    units: "Scores between 1 - 10"
                },
                {
                    filename: "governance:populationTrustPlctstRatio",
                    label: "Population Trust in The Police",
                    negativeState: false,
                    units: "Scores between 1 - 10"
                },
                {
                    filename: "governance:populationTrustPlttstRatio",
                    label: "Population Trust in The Political System",
                    negativeState: false,
                    units: "Scores between 1 - 10"
                },
                {
                    filename: "governance:voterTurnoutEuParliament",
                    label: "Voter Turnout in The Elections For The European Parliament",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "governance:voterTurnoutParliamentary",
                    label: "Voter Turnout in The Elections For The National Parliament",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "governance:voterTurnoutPresidential",
                    label: "Voter Turnout in The Elections For The National President",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            filename: "health",
            label: "Health",
            aggregators: [
                {
                    filename: "health:bodyMassIndex",
                    label: "Body Mass Index",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "health:depressiveMajorRatio",
                    label: "Depressive Symptoms (Major) Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:depressiveNormalRatio",
                    label: "Depressive Symptoms (Normal) Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:depressiveOtherRatio",
                    label: "Depressive Symptoms (Other) Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:personnelDentists",
                    label: "Health Personnel (Dentists) Ratio",
                    negativeState: false,
                    units: "per hundred thousand inhabitants"
                },
                {
                    filename: "health:personnelDoctors",
                    label: "Health Personnel (Doctors) Ratio",
                    negativeState: false,
                    units: "per hundred thousand inhabitants"
                },
                {
                    filename: "health:personnelNurses",
                    label: "Health Personnel (Nurses and Midwives) Ratio",
                    negativeState: false,
                    units: "per hundred thousand inhabitants"
                },
                {
                    filename: "health:personnelPharmacists",
                    label: "Health Personnel (Pharmacists) Ratio",
                    negativeState: false,
                    units: "per hundred thousand inhabitants"
                },
                {
                    filename: "health:personnelTherapists",
                    label: "Health Personnel (Therapists) Ratio",
                    negativeState: false,
                    units: "per hundred thousand inhabitants"
                },
                {
                    filename: "health:healthyLifeRatio",
                    label: "Healthy Life Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "health:healthyLifeYears",
                    label: "Healthy Life Years",
                    negativeState: false,
                    units: "years"
                },
                {
                    filename: "health:hospitalBeds",
                    label: "Hospital Beds",
                    negativeState: false,
                    units: "per hundred thousand inhabitants"
                },
                {
                    filename: "health:lifeExpectancy",
                    label: "Life Expectancy at Birth",
                    negativeState: false,
                    units: "years"
                },
                {
                    filename: "health:longHealthIssuesRatio",
                    label: "Long Health Issues Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:nonAlcoholicRatio",
                    label: "Non-Alcoholic Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "health:nonFruitsVegetablesRatio",
                    label: "Non-Fruits Vegetables Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:physicalActivitiesRatio",
                    label: "Physical Activities Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "health:smokersRatio",
                    label: "Smokers Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:unmetDentalStatus",
                    label: "Unmet Dental Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:unmetMedicalStatus",
                    label: "Unmet Medical Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "health:workAccidents",
                    label: "Work Accidents Ratio",
                    negativeState: true,
                    units: "per thousand inhabitants"
                }
            ]
        },
        {
            filename: "leisureInteractions",
            label: "Leisure and Social Interactions",
            aggregators: [
                {
                    filename: "leisureInteractions:askingRatio",
                    label: "Asking Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:discussionRatio",
                    label: "Discussion Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:formalVoluntaryActivitiesRatio",
                    label: "Formal Voluntary Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:frequencyContactFamRatio",
                    label: "Frequency Contact Ratio (Family)",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:frequencyContactFrdRatio",
                    label: "Frequency Contact Ratio (Friends)",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:gettingTogetherFamRatio",
                    label: "Getting Together Ratio (Family)",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:gettingTogetherFrdRatio",
                    label: "Getting Together Ratio (Friends)",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:areaSatisfactionRatio",
                    label: "Green Areas Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:informalVoluntaryActivitiesRatio",
                    label: "Informal Voluntary Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npNnbCinemaRatio",
                    label: "Non-Participation in Cinema due to lack of interest",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npFinCinemaRatio",
                    label: "Non-Participation in Cinema for financial reasons",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npNnbCultureRatio",
                    label: "Non-Participation in Cultural Sites due to lack of interest",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npFinCultureRatio",
                    label: "Non-Participation in Cultural Sites for financial reasons",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npNoInterestFormalRatio",
                    label: "Non-Participation in Formal Voluntary Activities due to lack of interest",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npTimeFormalRatio",
                    label: "Non-Participation in Formal Voluntary Activities due to lack of time",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npNoInterestInformalRatio",
                    label: "Non-Participation in Informal Voluntary Activities due to lack of interest",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npTimeInformalRatio",
                    label: "Non-Participation in Informal Voluntary Activities due to lack of time",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npNnbLiveRatio",
                    label: "Non-Participation in Live Performances due to lack of interest",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npFinLiveRatio",
                    label: "Non-Participation in Live Performances for financial reasons",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npNnbSportRatio",
                    label: "Non-Participation in Sports Events due to lack of interest",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:npFinSportRatio",
                    label: "Non-Participation in Sports Events for financial reasons",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:relationshipsSatisfactionRatio",
                    label: "Relationships Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:socialActivitiesRatio",
                    label: "Social Activities Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "leisureInteractions:timeSpentSatisfaction",
                    label: "Time Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            filename: "livingConditions",
            label: "Material Living Conditions",
            aggregators: [
                {
                    filename: "livingConditions:dwellingIssuesRatio",
                    label: "Dwelling Issues Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:endMeetInabilityDifficultyRatio",
                    label: "Ends Meet With Difficulty",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:endMeetInabilityGreatDifficultyRatio",
                    label: "Ends Meet With Great Difficulty",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:financialSatisfactionRatio",
                    label: "Financial Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "livingConditions:gdpPerCapitaPpsRatio",
                    label: "GDP per Capita in PPS Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "livingConditions:highIncomeRatio",
                    label: "High Income Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "livingConditions:incomeQuintileRatio",
                    label: "Income Quintile Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:lackOfBathsRatio",
                    label: "Lack of Baths Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:lowWorkIntensityRatio",
                    label: "Low Work Intensity Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:materialDeprivationRatio",
                    label: "Material Deprivation Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:medianIncomePpsRatio",
                    label: "Median Income in PPS Ratio",
                    negativeState: false,
                    units: "PPS"
                },
                {
                    filename: "livingConditions:overOccupiedRatio",
                    label: "Over Occupied Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:povertyRiskRatio",
                    label: "Poverty Risk Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "livingConditions:underOccupiedRatio",
                    label: "Under Occupied Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            filename: "environment",
            label: "Natural and Living Environment",
            aggregators: [
                {
                    filename: "environment:airPollutionCh4Ratio",
                    label: "Air Pollution (CH4) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:airPollutionCoRatio",
                    label: "Air Pollution (CO) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:airPollutionNh3Ratio",
                    label: "Air Pollution (NH3) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:airPollutionNmvocRatio",
                    label: "Air Pollution (NMVOC) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:airPollutionNoxRatio",
                    label: "Air Pollution (NOX) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:airPollutionPm10Ratio",
                    label: "Air Pollution (PM10) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:airPollutionPm2_5Ratio",
                    label: "Air Pollution (PM2.5) Ratio",
                    negativeState: true,
                    units: "kilograms per capita"
                },
                {
                    filename: "environment:noisePollutionRatio",
                    label: "Noise Pollution Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "environment:pollutionRatio",
                    label: "Pollution Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "environment:waterSupplyRatio",
                    label: "Water Supply Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            filename: "overallExperience",
            label: "Overall Experience of Life",
            aggregators: [
                {
                    filename: "overallExperience:happinessAlwaysRatio",
                    label: "Happy All The Time",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "overallExperience:happinessMostOfTheTimeRatio",
                    label: "Happy Must of The Time",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "overallExperience:highSatisfactionRatio",
                    label: "High Satisfaction Ratio",
                    negativeState: false,
                    units: "%"
                }
            ]
        },
        {
            filename: "mainActivity",
            label: "Productive or Main Activity",
            aggregators: [
                {
                    filename: "mainActivity:avgWorkHours",
                    label: "Average Work Hours",
                    negativeState: false,
                    units: "hours"
                },
                {
                    filename: "mainActivity:employmentRatio",
                    label: "Employment Ratio",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "mainActivity:inactivePopulationRatio",
                    label: "Inactive Population Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:involuntaryPartTimeRatio",
                    label: "Involuntary Part-Time Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:jobSatisfaction",
                    label: "Job Satisfaction",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "mainActivity:longTermUnemploymentRatio",
                    label: "Long Term Unemployment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:lowWageEarnersRatio",
                    label: "Low Wage Earners Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:lowWorkIntensityRatio",
                    label: "Low Work Intensity Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:researchersRatio",
                    label: "Researchers Ratio",
                    negativeState: false,
                    units: "per ten thousand inhabitants"
                },
                {
                    filename: "mainActivity:temporaryEmploymentRatio",
                    label: "Temporary Employment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:unemploymentRatio",
                    label: "Unemployment Ratio",
                    negativeState: true,
                    units: "%"
                },
                {
                    filename: "mainActivity:workingFlexibilityRestrictiveRatio",
                    label: "Working Flexibility - Person can decide with certain restriction",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "mainActivity:workingFlexibilityFullRatio",
                    label: "Working Flexibility - Person can fully decide",
                    negativeState: false,
                    units: "%"
                },
                {
                    filename: "mainActivity:workingNightsRatio",
                    label: "Working Nights Ratio",
                    negativeState: true,
                    units: "%"
                }
            ]
        }
    ]
};
